"use client"

import React, { useState } from 'react'
import type { loginFormData,loginResponse } from '@/app/type/auth';
import { useRouter } from 'next/router';

function validate(data : loginFormData): Partial<Record<keyof loginFormData, string >>{
    const errors : Partial<Record<keyof loginFormData,string>> ={};

    if(!data.email){
        errors.email = "Email is required.";
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
        errors.email = "Enter a valid email Address.";
    }

    if(!data.password){
        errors.password = "Password is required.";
    }else if(data.password.length < 8){
        errors.password ="Password mest be at least 8 characters";
    }

    return errors;
}


const AdminLoginPage = () => {
    const router = useRouter();
    const [form, setForm] = useState<loginFormData>({
        "email":"",
        "password" : "",
        "remember" : false
    });

    const [errors, setErrors] = useState<Partial<Record <keyof loginFormData,string>>>({});
    const [serverError, setServerErrror] = useState<string>("");
    const [isLoading , setIsLoading] = useState<boolean>(false);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>):void {
        const {name , value, type, checked} = e.target;
        setForm((prev) => ({
            ...prev,
            [name] : type === 'checkbox' ? checked : value,
        }));

        if(errors[name as keyof loginFormData]){
            setErrors((prev) => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    async function headleSubmit(e:React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setServerErrror("");

        const validationErrors  = validate(form) ;
        if(Object.keys(validationErrors).length > 0 ){
            setErrors(validationErrors);
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/auth/login',{
                method : "post",
                headers : {"Content-type":"application/json"},
                body : JSON.stringify(form)
            });

            const data: loginResponse = await res.json();

            if(!res.ok || !data.success) {
                setServerErrror(data.error ?? "login failed. please try again.");
            }

            if(data.token) {
               document.cookie = `token=${data.token}; path=/; ${form.remember ? "max-age=604800": ""}`;
            }

            if(data.user){
                document.cookie = `role=${data.user.role}; path=/`;
            }

            router.push("admin");

        } catch (error) {
            setServerErrror("Someting went wrong. please try again.");
            console.error("error",error);
        } finally{
            setIsLoading(false);
        }
    }


  return (
    <div>page</div>
  )
}

export default AdminLoginPage