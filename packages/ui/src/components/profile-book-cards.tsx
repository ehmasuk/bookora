"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Edit,
  Trash
} from 'lucide-react'


export interface BookCardProps {
  id: string
  title: string
  author: string
  coverImage: string
  summary: string | null
  status: "public" | "private"
  EditComponent?: React.ReactNode;
  DeleteComponent?: React.ReactNode;
}

export function BookCard({ id, title, author, coverImage, summary = "This is a default summary", status, EditComponent, DeleteComponent }: BookCardProps) {
  return (
    <Card className='max-w-md'>
      <CardHeader className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='flex items-center gap-1 text-sm line-clamp-1'>
              {title}
            </CardTitle>
            <CardDescription>{status}</CardDescription>
          </div>
        </div>

      </CardHeader>
      <CardContent className='space-y-6 text-sm'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkUgR2D14HmBubZQcXXYJ8J3_wJ7qp-fIt7A&s'
          alt='Banner'
          className='aspect-video w-full rounded-md object-contain'
        />
            <p>{summary}</p>
      </CardContent>
      <CardFooter className='flex items-center gap-1'>


            {EditComponent}
            {DeleteComponent}


      </CardFooter>











    </Card>
  )
}
