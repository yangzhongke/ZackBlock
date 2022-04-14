import { createRouter,createWebHashHistory} from "vue-router";
import FlowEditor from "../views/FlowEditor.vue";
const routes = [{path: "/", redirect: "/FlowEditor"},
{path: "/FlowEditor",name:"FlowEditor",component: FlowEditor}]
const router = createRouter({history: createWebHashHistory(),routes: routes});
export default router