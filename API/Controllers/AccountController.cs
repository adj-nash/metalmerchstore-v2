using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using MetalMerchStore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using API.Entities;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseController
{

    [HttpPost("register")]

    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User {UserName = registerDto.Email, Email = registerDto.Email};

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if(!result.Succeeded)
        {
            foreach(var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }

        await signInManager.UserManager.AddToRoleAsync(user, "Member");

        return Ok();
    }

    [HttpGet("user-info")]
    public async Task<ActionResult> UserInfo()
    {
        if(User.Identity?.IsAuthenticated == false) return NoContent(); 

        var user = await signInManager.UserManager.GetUserAsync(User);

        if(user == null) return Unauthorized();

        var roles = await signInManager.UserManager.GetRolesAsync(user);

        return Ok(new {
            user.Email, 
            user.UserName,
            Roles = roles
        });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return NoContent();
    }

    [Authorize]
    [HttpPost("update-address")]
    public async Task<ActionResult<Address>> UpdateAddress(Address address)
    {
        var user = await signInManager.UserManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .FirstOrDefaultAsync();

        if(user == null) return Unauthorized();

        user.Address = address;

        var result = await signInManager.UserManager.UpdateAsync(user);

        if(!result.Succeeded) return BadRequest("There was a problem updating your address!");

        return Ok(user.Address);
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Address>> GetAddress()
    {
        var address = await signInManager.UserManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .Select(x => x.Address)
            .FirstOrDefaultAsync();

        if(address == null) return NoContent();

        return address;
    }  


}
