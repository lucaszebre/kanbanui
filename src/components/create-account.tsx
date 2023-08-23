import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import z from 'zod'
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { FormDataRegister, schemaRegister } from "@/types"
import supabase from "@/supabase"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function CreateAccount() {
    const Router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success,setSuccess]=useState<boolean>(false)
    const { register, handleSubmit,watch, formState: { errors } } = useForm<FormDataRegister>({ resolver: zodResolver(schemaRegister) });
    const watched = watch()
    const onSubmit = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
        
            if (error) {
                console.error('Registration error:', error.message);
                // Handle registration error (e.g., display an error message to the user)
                return; // Exit early in case of error
            }
        
            console.log('Registration successful:', data.user);
        
            // Initiate the user in your MongoDB or handle other related logic
            try {
                const response = await axios.post('http://localhost:4000/auth/init', {
                userId: data.user?.id,
                }, { withCredentials: true });
        
                if (response.status === 201) {
                console.log('User initiated successfully');
                } else {
                console.error('User initiation failed');
                }
            } catch (initError) {
                console.error('User initiation error:', initError);
            }
        
            // Redirect to login page after a successful registration and initiation
            Router.push('/login');
            } catch (error) {
            console.error('Registration error:', error);
            // Handle registration error (display error message, etc.)
            }
        };
        
        
        
    return (
        <form onSubmit={handleSubmit(()=>{
            setEmail(watched.email);
            setPassword(watched.password1);
            onSubmit();
        })}>
        <Card className="border-none">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
            Enter your email below to create your account
            </CardDescription>
        </CardHeader>
       
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6 rounded">
            <Button className="rounded " variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
            </Button>
            <Button className="rounded" variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
            </Button>
            </div>
            <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                Or continue with
                </span>
            </div>
            </div>
            
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input {...register('email')} style={errors.email ? { border: '#EC5757 1px solid' } : {}} className="rounded" id="email" type="email" placeholder="m@example.com" />
            {errors.email && <p className='text-red-500 font-thin'>{errors.email.message?.toString()}</p>}
            </div>
            <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input {...register('password1')} className="rounded" style={errors.password1 ? { border: '#EC5757 1px solid' } : {}} id="password" type="password" />
            {errors.password1 && <p className="text-red-500 font-thin">{errors.password1.message?.toString()}</p>}
            </div>
            <div className="grid gap-2">
            <Label htmlFor="password">Password again</Label>
            <Input {...register('password2')} style={errors.password2 ? { border: '#EC5757 1px solid' } : {}} className="rounded" id="password" type="password" />
            {errors.password2 && <p className="text-red-500 font-thin">{errors.password2.message?.toString()}</p>}
            </div>
        </CardContent>
        <CardFooter>
            <Button type="submit" className="w-full bg-black text-white hover:text-white hover:bg-gray-400 rounded">Create account</Button>
        </CardFooter>
        
        </Card>
       </form>)
    }



