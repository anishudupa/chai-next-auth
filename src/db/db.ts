import mongoose from "mongoose"

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("mongodb connected successfully")
        })

        connection.on("error", (err) => {
            console.log(
                "something went wrong while connecting to mongodb " + err
            )
            process.exit(1)
        })
    } catch (error) {
        console.log("somethning went wrong while connecting to db " + error)
    }
}
