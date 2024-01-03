import { init } from "./framework";
import { User } from "./src/user";

const firstName = "david";
const lastName = "brandes";

init(" #app ", User({ firstName, lastName}));
