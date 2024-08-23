"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const API_URL = process.env.BACKEND_URL + '/api'
const AUTH_URL = process.env.BACKEND_URL + '/auth'

/**
 * Sends a request to the specified URL using the specified method and options.
 * @param {Object} options - The request options.
 * @param {string} options.url - The URL to send the request to.
 * @param {string} [options.method='GET'] - The HTTP method to use for the request. `GET`, `POST`, `PUT`, or `DELETE`.
 * @param {Object} [options.body={}] - The request body.
 * @param {boolean} [options.auth=true] - Indicates whether authentication is required.
 * @param {boolean} [options.cache=true] - Indicates whether to cache the response.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the response data if successful, or false if there was an error.
 */
export const sendRequest = async ({ url, method = 'GET', body = {}, auth = true, cache = true }) => {
    if(!url) return false
    let methodType = ['get', 'post', 'put', 'delete']
    if(!methodType.includes(method.toLowerCase())) return false
    let accessToken = ''
    if(auth){
        const session = await getServerSession(authOptions)
        if(!session) {
            redirect('/login')
            return false
        }
        if(!session.user) {
            redirect('/login')
            return false
        }
        accessToken = session?.user?.accessToken
        if(!accessToken) {
            redirect('/login')
            return false
        }
    }
    let headers = {}
    if(auth) headers = {"Authorization" : `Bearer ${accessToken}`, "Content-Type": "application/json"}
    else headers = {"Content-Type": "application/json"}
    let fetchOptions
    if(method.toLowerCase() == 'get' || method.toLowerCase() == 'delete') fetchOptions = { method, headers }
    else fetchOptions = { method, headers, body: JSON.stringify(body) }
    if(!cache) fetchOptions = { ...fetchOptions, cache: 'no-store' }
    else fetchOptions = { ...fetchOptions, cache: 'force-cache' }
    let res
    try {
        res = await fetch(API_URL + url, fetchOptions)
    } catch(err){
        console.error(`Error sending ${method} request: `, err)
        return false
    }
    if(!res) return false
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) return false
    const result = await res.json()
    if(!result) return false
    if(result.status == 502) return redirect('/logout')
    return result
}


/**
 * Sends images to the server.
 * @param {Object} options - The options for sending images.
 * @param {FormData} options.formData - The form data containing the images to send.
 * @param {boolean} [options.auth=true] - Indicates whether authentication is required.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the response object if successful, or false if there was an error.
 */
export const sendImages = async ({ formData, auth = true }) => {
    if(!formData) return false
    let accessToken = ''
    if(auth){
        const session = await getServerSession(authOptions)
        if(!session) {
            redirect('/login')
            return false
        }
        if(!session.user) {
            redirect('/login')
            return false
        }
        accessToken = session?.user?.accessToken
        if(!accessToken) {
            redirect('/login')
            return false
        }
    }
    let headers = {}
    if(auth) headers = {"Authorization" : `Bearer ${accessToken}`}
    let res
    try {
        res = await fetch(API_URL + '/upload', {
            method: 'POST',
            headers: headers,
            body: formData
        })
    } catch(err){
        console.error('Error sending image request: ', err)
        return false
    }
    if(!res) return false
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) return false
    const result = await res.json()
    if(!result) return false
    if(result.status == 502) return redirect('/logout')
    return result
}

/**
 * Registers a user by making a POST request to the AUTH_URL/register endpoint.
 * @param {Object} options - The options for the registration request.
 * @param {Object} options.data - The data to be sent in the request body.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the response data if successful, or false if there was an error.
 */
export const register = async ({ data }) => {
    try {
        if(!data) return false
        const res = await fetch(AUTH_URL + "/register", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const resData = await res.json()
        if(!resData) return false
        return resData
    } catch(err){
        console.error('Error registering: ', err)
        return false
    }
}

/**
 * Verifies an email by sending a verification code to the server.
 * @param {Object} options - The options for verifying the email.
 * @param {string} options.email - The email to be verified.
 * @param {string} options.code - The verification code.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the response data if successful, or false if there was an error.
 */
export const verifyEmail = async ({ email, code }) => {
    try {
        if(!email) return false
        const res = await fetch(AUTH_URL + "/verifyEmail", {
            method: 'POST',
            body: JSON.stringify({ email, code }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const resData = await res.json()
        if(!resData) return false
        return resData
    } catch(err){
        console.error('Error verifying email: ', err)
        return false
    }
}

/**
 * Validates a code for a given email.
 * @param {Object} params - The parameters for code validation.
 * @param {string} params.email - The email to validate the code for.
 * @param {string} params.code - The code to validate.
 * @returns {Promise<any>} - A promise that resolves to the validation result.
 */
export const validateCode = async ({ email, code }) => {
    try {
        if(!email) return false
        const res = await fetch(AUTH_URL + "/validateCode", {
            method: 'POST',
            body: JSON.stringify({ email, code }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const resData = await res.json()
        if(!resData) return false
        return resData
    } catch(err){
        console.error('Error validating code: ', err)
        return false
    }
}

/**
 * Sends a request to the server to reset the user's password.
 * @param {Object} options - The options for the request.
 * @param {string} options.email - The user's email address.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the response data if successful, or false if there was an error.
 */
export const forgotPassword = async ({ email }) => {
    try {
        if(!email) return false
        const res = await fetch(AUTH_URL + "/forgotPassword", {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const resData = await res.json()
        if(!resData) return false
        return resData
    } catch(err){
        console.error('Error sending forgot password: ', err)
        return false
    }
}

/**
 * Resets the password for a user.
 *
 * @param {Object} params - The parameters for resetting the password.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The new password.
 * @param {string} params.code - The reset code.
 * @returns {Promise<Object|boolean>} - A promise that resolves to the response data if successful, or false if unsuccessful.
 */
export const resetPassword = async ({ email, password, code }) => {
    try {
        if(!email || !password || !code) return false
        const res = await fetch(AUTH_URL + "/resetPassword", {
            method: 'POST',
            body: JSON.stringify({ email, password, code }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const resData = await res.json()
        if(!resData) return false
        return resData
    } catch(err){
        console.error('Error resetting password: ', err)
        return false
    }
}


