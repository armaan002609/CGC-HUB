import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { url, title } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 })
    }

    const banner = await prisma.heroBanner.create({
      data: {
        url,
        title: title || null,
        isActive: true,
      }
    })

    return NextResponse.json(banner)
  } catch (error) {
    console.error("Hero upload error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    await prisma.heroBanner.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Hero delete error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
