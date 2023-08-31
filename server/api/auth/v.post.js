import { getUsers } from "~/utils/firebase/user"

export default defineEventHandler(async(event) => {
    const form = await readBody(event);
    const users = await getUsers();
    const res = {error: {}, success: false}
    const user = users.hasEmail(form.email);
    if(!user){
        res.error.email = "Email doesn't exist";
    } else if (user.password != form.password){
        res.error.password = true;
    } else {
        res.success = true;
        setCookie(event, '_cid', user.userId, { httpOnly: true });
    }
    return res;
})