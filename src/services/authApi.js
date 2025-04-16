import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearCredentials } from '../features/auth/authSlice';
// true url https://6wqwjnilkygbweybic5ywpqmse0akwlt.lambda-url.us-east-1.on.aws
// fake url https://lzqogg674ftg74ippdjunnhvdy0nbjyr.lambda-url.us-east-1.on.aws
const baseQuery = fetchBaseQuery({
    baseUrl: "https://6wqwjnilkygbweybic5ywpqmse0akwlt.lambda-url.us-east-1.on.aws",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
          // Asegúrate de que estos headers estén configurados
          headers.set('Content-Type', 'application/json');
          return headers
    }
})

const baseQueryWithReauth = async (args,api,extraOption) =>{
    let result = await baseQuery(args,api,extraOption);
    if(result.error && result.error.status === 401){
        api.dispatch(clearCredentials())
        return {error:{status:401,data:'secion esperidada'}}
    
    }
    return  result;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => (
        {
            login: builder.mutation({
                query: (credentials) => ({
                    url: '/login',
                    method: 'POST',
                    body: credentials
                })
            }),
            getTable:builder.query({
                query:(config) =>{
                    const {endpoint}=config
                    return(
                        {url:`/${endpoint}`,
                        method:'GET'
                        }
                    )
                },
                providesTags: (result, error, arg) => [{ type: 'Resource', id: arg.endpoint }]
            }),
            createResource:builder.mutation(
                {
                   query:({endpoint,data})=>({
                    url:endpoint,
                    method:"POST",
                    body:data
                   }),
                   invalidatesTags: (result, error, arg) => [{ type: 'Resource', id: arg.endpoint }]
                }
            ),
            updateResource:builder.mutation(
                {
                    query:({endpoint,id,data})=>({
                        url:`${endpoint}/${id}`,
                        method:"PUT",
                        body:data
                    }),
                    invalidatesTags: (result, error, arg) => [{ type: 'Resource', id: arg.endpoint }]
                }
            ),
            deleteResource:builder.mutation(
                {
                    query:({endpoint,id})=>({
                        url:`${endpoint}/${id}`,
                        method:"DELETE",
                    }),
                    invalidatesTags: (result, error, arg) => [{ type: 'Resource', id: arg.endpoint }]
                }
            )

        }
    )
})


export const {
    useLoginMutation,
    useGetTableQuery,
    useCreateResourceMutation,
    useUpdateResourceMutation,
    useDeleteResourceMutation,
} = authApi