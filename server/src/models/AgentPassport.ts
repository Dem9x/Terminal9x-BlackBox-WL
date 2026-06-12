import mongoose, { Schema, type InferSchemaType } from "mongoose";

export const divisions = [
  "Cipher Analyst",
  "Field Observer",
  "Interrogation Specialist",
  "Blackbox Intern",
  "Protocol Director",
] as const;

const agentPassportSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    codename: { type: String, required: true, trim: true, minlength: 3, maxlength: 32 },
    division: { type: String, enum: divisions, default: "Cipher Analyst" },
    rank: { type: String, default: "Trainee Analyst" },
    xp: { type: Number, default: 0 },
    casesClosed: { type: Number, default: 0 },
    badgesCollected: { type: Number, default: 0 },
    avatarUrl: { type: String, trim: true },
    avatarId: { type: String, trim: true },
    clearanceLevel: { type: String, default: "Level 01" },
    freeMintEligible: { type: Boolean, default: true },
    whitelistStatus: { type: String, enum: ["reserved", "approved", "waitlisted"], default: "reserved" },
    whitelistCode: { type: String, trim: true },
    referralCode: { type: String, trim: true },
    whitelistJoinedAt: { type: Date, default: Date.now },
    passportMinted: { type: Boolean, default: false },
    passportTokenId: { type: String, trim: true },
    passportTxHash: { type: String, trim: true },
    mintedAt: { type: Date },
  },
  { timestamps: true }
);

agentPassportSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

export type AgentPassportDocument = InferSchemaType<typeof agentPassportSchema> & {
  _id: mongoose.Types.ObjectId;
};
export const AgentPassport = mongoose.model("AgentPassport", agentPassportSchema);
