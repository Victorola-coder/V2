import { getUsers, createUser } from "~/utils/firebase/user"

export default defineEventHandler(async(event) => {
    const form = await readBody(event);
    const users = await getUsers();
    const res = {error: {}, success: true}
    if(users.hasEmail(form.email)){
        res.success = false;
        res.error.email = "Email already exists";
    } else {
        await createUser(form)
            .then(userId => {
                setCookie(event, '_cid', userId, {
                    httpOnly: true
                })
            })
            .catch(err => {
                console.error(err.message);
                console.error(err.stack);
                res.success = false;
                res.error.server = true;
                setResponseStatus(event, 500, 'Error occured');
            })
    }
    return res;
})