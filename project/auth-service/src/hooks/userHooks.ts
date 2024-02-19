import { Schema } from "mongoose";

// always upate last activity when save
export function userHooks (userSchema: Schema) {
    userSchema.pre("save", function(next) {
        this.lastActivity = new Date()
        next()
    });

    userSchema.pre('updateOne', function(next){
        this.set({ lastActivity: new Date()})
        next()
    });
}

