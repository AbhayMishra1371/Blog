import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(lol) {
    try {
        const client = await clientPromise;
        const db = client.db("Studzee_Database");

        const content = await db.collection("content").find({}).toArray();

        const formatted = content.map((doc) => ({
            ...doc,
            _id: doc._id.toString(),
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("API ERROR:", error);

        return NextResponse.json(
            { error: "Failed to fetch content" },
            { status: 500 }
        );
    }
}
