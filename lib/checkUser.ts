import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async ()=>{
    console.log("🔥 checkUser called");
    const user = await currentUser();
    // console.log("Current user: ", user);

        if (!user?.id) {
            console.warn("No Clerk user found in checkUser");
            return null;
        }

    try {
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user?.id
            },
            include:{
                transactions: {
                    where:{
                        type: "CREDIT_PURCHASE",
                        createdAt: {
                            gte: new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1)
                        }
                    },
                    orderBy:{ createdAt: "desc" },
                    take: 1
                }
            }
        });
        if (loggedInUser) {
            return loggedInUser;
        }

        if (!user?.id) {
            throw new Error("User ID is required to create a new user");
        }

        const name = `${user?.firstName || "User"} ${user?.lastName || ""}`.trim();
        const newUser = await db.user.create({
            data: {
                clerkUserId: user?.id,
                email: user?.emailAddresses[0]?.emailAddress || "",
                name: name || "User",
                imageUrl: user?.imageUrl,
                transactions:{
                    create: {
                        type: "CREDIT_PURCHASE",
                        packageId: "free_user",
                        amount: 2,
                    }
                }
            }
        });
        return newUser;
        
    } catch (error:unknown) {
        console.error("checkUser failed:", error);
        return null;
    }
}