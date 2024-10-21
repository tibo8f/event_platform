"use server"

import { CreateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import Category from "../database/models/category.model"

const populateEvent = async (query: any) => {
    // Provide more than the id, provide the full name
    return query   
        .populate({ path: 'organizer', model: User, select: '_id firstName lastName'})
        .populate({ path: 'category', model: Category, select: '_id name'})
}

export const createEvent = async ({ event, userId, path }:CreateEventParams) =>{
try {
    console.log("actions create event")
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if(!organizer){
        throw new Error("Organizer not found");
    }
 
    console.log({
        categoryId: event.categoryId,
        organizerId: userId,
    })
    
    const newEvent = await Event.create({
        ...event,
        category: event.categoryId,
        organizer: userId
    })

    return JSON.parse(JSON.stringify(newEvent));

} catch (error) {
    console.log(error);
    handleError(error);
}
}

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId)); // PopulateEvent provide more than the id but the full name

        if(!event){
            throw new Error("Event not found")
        }

        return JSON.parse(JSON.stringify(event));

    } catch (error) {
        handleError(error);
    }
}