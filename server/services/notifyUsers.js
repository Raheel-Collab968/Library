import cron from 'node-cron';
import { User } from '../models/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import { Borrow } from '../models/borrowModel.js';

export const notifyUsers =  () => {
    cron.schedule("*/30 * * * *", async () => {
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const borrowers = await Borrow.find({
                dueDate: { $lte: oneDayAgo },
                returnDate: null,
            });

            for(const element of borrowers){
                if(element.user && element.user.email){
                    sendEmail({
                        email : element.user.email,
                        subject: "Overdue Book Return Reminder",
                        message: `Dear ${element.user.name},\n\nThis is a friendly reminder that the book you borrowed is overdue. Please return it as soon as possible to avoid further fines.\n\nThank you,\nLibrary Team`
                    });
                    element.notified = true;
                    await element.save();
                    console.log(`Notification sent to ${element.user.email}`);
                }
            }

        } catch (error) {
           console.error("Error in notifying users:", error);    
        }
    });
}