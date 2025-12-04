import { connect } from "mongoose"

const mongodbUrl = process.env.MONGODB_URL!
if(!mongodbUrl) console.log("mongo db not found")

let cached=globalThis.mongoose

if(!cached) cached=globalThis.mongoose={conn:null,promise:null}

const connectDb = async ()=>{
  if(cached.conn) return cached.conn
  
  if(!cached.promise) cached.promise = connect(mongodbUrl).then((c)=>c.connection)

  cached.conn=await cached.promise

  return cached.conn
}

export default connectDb;