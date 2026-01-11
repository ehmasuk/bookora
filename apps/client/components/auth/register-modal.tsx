import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import usePost from '@/hooks/usePost'
import { Button } from '@workspace/ui/components/button'
import { Checkbox } from '@workspace/ui/components/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@workspace/ui/components/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'

const RegisterModal = () => {
  const id = useId()
  const router = useRouter()
  const { postData, loading } = usePost()

  const formSchema = z.object({
    firstname: z.string().min(1, { message: 'First name is required' }),
    lastname: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be 8 characters long' }),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' })
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      terms: true
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    postData({
      url: '/auth/register',
      data: {
        name: `${values.firstname} ${values.lastname}`,
        email: values.email,
        password: values.password
      },
      onSuccess: () => {
        signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false
        })
        toast.success('Registered successfully')
        router.push('/profile')
      },
      onError: (err) => {
        toast.error(err)
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='black'>Get Started</Button>
      </DialogTrigger>
      <DialogContent className='to-card bg-gradient-to-b from-green-100 to-40% [background-size:100%_101%] sm:max-w-sm dark:from-green-900'>
        <DialogHeader className='items-center'>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>Start your 60-day free trial now.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem className='grid gap-3 space-y-0'>
                    <FormLabel htmlFor='firstname'>First Name</FormLabel>
                    <FormControl>
                      <Input id='firstname' placeholder='John' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem className='grid gap-3 space-y-0'>
                    <FormLabel htmlFor='lastname'>Last Name</FormLabel>
                    <FormControl>
                      <Input id='lastname' placeholder='Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='grid gap-3 space-y-0'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='example@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='grid gap-3 space-y-0'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='terms'
              render={({ field }) => (
                <FormItem className='flex flex-col space-y-2'>
                  <div className='flex items-center gap-2'>
                    <FormControl>
                      <Checkbox
                        id={id}
                        className='focus-visible:ring-green-600/20 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 dark:text-white dark:focus-visible:ring-green-400/40 dark:data-[state=checked]:border-green-400 dark:data-[state=checked]:bg-green-400'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel htmlFor={id} className='gap-1 font-normal'>
                      I agree with{' '}
                      <a href='#' className='underline hover:no-underline'>
                        condition
                      </a>{' '}
                      and{' '}
                      <a href='#' className='underline hover:no-underline'>
                        privacy policy
                      </a>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='pt-4 sm:flex-col'>
              <Button
                type='submit'
                loading={loading}
                className='bg-green-600 text-white hover:bg-green-600 focus-visible:ring-green-600 dark:bg-green-400 dark:hover:bg-green-400 dark:focus-visible:ring-green-400'
              >
                Start your trial
              </Button>
              <div className='before:bg-border after:bg-border flex items-center gap-4 before:h-px before:flex-1 after:h-px after:flex-1'>
                <span className='text-muted-foreground text-xs'>Or</span>
              </div>
              <Button type='button' variant='outline'>
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto'
                  alt='Google Icon'
                  className='size-5'
                />
                <span className='flex justify-center'>Continue with Google</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterModal
