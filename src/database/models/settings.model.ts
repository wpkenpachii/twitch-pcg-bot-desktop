import { Settings } from "@/database/types/settings.types"

export async function storeSettings(settings: Settings) {
    try {
    } catch (error: any) {
        throw new Error(error.message)  
    }
}

// export async function getSettings(): Promise<Settings> {
//     try {
//     } catch (error: any) {
//         throw new Error(error)
//     }
// }