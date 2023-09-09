import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

let app;

const appRouter = router({
    signUp: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string()
        }))
        .mutation(async (opts) => {
            // context
            let email = opts.input.email;
            let password = opts.input.password;

            // Do validations here
            // Do database stuff here 

            let token = "123123";
            return {
                token
            }
        }),
    createTodo: publicProcedure
        .input(z.object({
            title: z.string()
        }))
        .mutation(async (opts) => {
            console.log(opts.ctx.username)
            return {
                id: "1"
            }
        })

});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);
    //jwt.verify()
    return {
        username: "123"
    }
  }
});
   
server.listen(3000);

export type AppRouter = typeof appRouter;


