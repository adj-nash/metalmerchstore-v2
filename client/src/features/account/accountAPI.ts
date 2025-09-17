import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseAPI";
import { Address, User } from "../../app/models/user";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { RegisterSchema } from "../../lib/schemas/registerSchema";
import { toast } from "react-toastify";


export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserInfo"],
    endpoints: (builder) => ({
        login: builder.mutation<void, LoginSchema>({
            query: (credentials) => {
                return {
                    url: "login?useCookies=true",
                    method: "POST",
                    body: credentials
                }
            },
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        registerUser: builder.mutation<void, RegisterSchema>({
            query: (credentials) => {
                return {
                    url: "account/register",
                    method: "POST",
                    body: credentials
                }
            },
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled;
                    toast.success("Registration sucssessful! You can now login.")
                    router.navigate("/login");
                } catch (error) {
                    console.log(error);
                }
            }
            
        }),
        userInfo: builder.query<User, void>({
            query: () => "account/user-info",
            providesTags: ["UserInfo"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: "account/logout",
                method: "POST"
            
            }),
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                    router.navigate("/");
                },
            
        }),
        address: builder.query<Address, void>({
            query: () => "account/address"
        }),
        updateAddress: builder.mutation<Address, Address>({
            query: (address) => ({
                url: "account/update-address",
                method: "POST",
                body: address
                
            }),
            onQueryStarted: async (address, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    accountApi.util.updateQueryData("address", undefined, (draft) => {
                        Object.assign(draft, {...address})
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                    console.log(error);
                }
            }
        })

    })
});

export const {useLoginMutation, useRegisterUserMutation, useLogoutMutation, useUserInfoQuery, useLazyUserInfoQuery, useAddressQuery, useUpdateAddressMutation} = accountApi;