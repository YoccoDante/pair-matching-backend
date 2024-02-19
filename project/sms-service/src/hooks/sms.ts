import { Schema } from "mongoose";

// always upate last activity when save
export function smsHooks (smsSchema: Schema) {
    smsSchema.pre("save", function(next) {
        this.emition = new Date()
        next()
    });

    smsSchema.pre('updateOne', function(next){
        this.set({ emition: new Date()})
        next()
    });
}

