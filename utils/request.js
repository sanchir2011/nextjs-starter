"use server"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import jwt from 'jsonwebtoken'

export const sendGet = async (url, auth = true, cache = true) => {
    try {
        if(!url) return false
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
        let fetchOptions = { method: 'GET', headers: headers }
        if(!cache) fetchOptions = { ...fetchOptions, cache: 'no-store' }
        const res = await fetch(process.env.NEXT_URL + '/v1/api' + url, fetchOptions)
        if(!res) return false
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) return false
        const result = await res.json()
        if(!result) return false
        if(result.status == 502) return redirect('/logout')
        return result
    } catch(err){
        console.error('Error sending get request: ', err)
        return false
    }
}

export const sendPost = async (url, body, auth = true, cache = true) => {
    try {
        if(!url) return false
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
        let fetchOptions = { method: 'POST', headers: headers, body: JSON.stringify(body) }
        if(!cache) fetchOptions = { ...fetchOptions, cache: 'no-store' }
        const res = await fetch(process.env.NEXT_URL + '/v1/api' + url, fetchOptions)
        if(!res) return false
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) return false
        const result = await res.json()
        if(!result) return false
        if(result.status == 502) return redirect('/logout')
        return result
    } catch(err){
        console.error('Error sending post request: ', err)
        return false
    }
}

export const sendPut = async (url, body, auth = true, cache = true) => {
    try {
        if(!url) return false
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
        let fetchOptions = { method: 'PUT', headers: headers, body: JSON.stringify(body) }
        if(!cache) fetchOptions = { ...fetchOptions, cache: 'no-store' }
        const res = await fetch(process.env.NEXT_URL + '/v1/api' + url, fetchOptions)
        if(!res) return false
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) return false
        const result = await res.json()
        if(!result) return false
        if(result.status == 502) return redirect('/logout')
        return result
    } catch(err){
        console.error('Error sending put request: ', err)
        return false
    }
}

export const sendDelete = async (url, auth = true) => {
    try {
        if(!url) return false
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
        const res = await fetch(process.env.NEXT_URL + '/v1/api' + url, {
            method: 'DELETE',
            headers: headers
        })
        if(!res) return false
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) return false
        const result = await res.json()
        if(!result) return false
        if(result.status == 502) return redirect('/logout')
        return result
    } catch(err){
        console.error('Error sending delete request: ', err)
        return false
    }
}

export const sendImages = async (formData, auth = true) => {
    try {
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
        const res = await fetch(process.env.NEXT_URL + '/v1/api/upload', {
            method: 'POST',
            headers: headers,
            body: formData
        })
        if(!res) return false
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) return false
        const result = await res.json()
        if(!result) return false
        if(result.status == 502) return redirect('/logout')
        return result
    } catch(err){
        console.error('Error sending image request: ', err)
        return false
    }
}

export const register = async (registerData) => {
    try {
        if(!registerData) return false
        const res = await fetch(process.env.BACKEND_URL + "/auth/register", {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const data = await res.json()
        if(!data) return false
        return data
    } catch(err){
        console.error('Error registering: ', err)
        return false
    }
}

export const verifyEmail = async (email, code) => {
    try {
        if(!email) return false
        const res = await fetch(process.env.BACKEND_URL + "/auth/verifyEmail", {
            method: 'POST',
            body: JSON.stringify({ email, code }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const data = await res.json()
        if(!data) return false
        return data
    } catch(err){
        console.error('Error verifying email: ', err)
        return false
    }
}

export const validateCode = async (email, code) => {
    try {
        if(!email) return false
        const res = await fetch(process.env.BACKEND_URL + "/auth/validateCode", {
            method: 'POST',
            body: JSON.stringify({ email, code }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const data = await res.json()
        if(!data) return false
        return data
    } catch(err){
        console.error('Error validating code: ', err)
        return false
    }
}

export const forgotPassword = async (email) => {
    try {
        if(!email) return false
        const res = await fetch(process.env.BACKEND_URL + "/auth/forgotPassword", {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const data = await res.json()
        if(!data) return false
        return data
    } catch(err){
        console.error('Error sending forgot password: ', err)
        return false
    }
}

export const resetPassword = async (email, password, code) => {
    try {
        if(!email || !password || !code) return false
        const res = await fetch(process.env.BACKEND_URL + "/auth/resetPassword", {
            method: 'POST',
            body: JSON.stringify({ email, password, code }),
            headers: { "Content-Type": "application/json" },
            cache: 'no-store'
        })
        const data = await res.json()
        if(!data) return false
        return data
    } catch(err){
        console.error('Error resetting password: ', err)
        return false
    }
}


