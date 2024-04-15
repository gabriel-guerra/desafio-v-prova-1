import { Router } from 'express';
import hello from './src/hello';

const router = Router();

router.get("/hello", hello.helloWorld);

export { router };