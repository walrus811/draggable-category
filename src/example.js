/* 카테고리 노드 사용법 */
import {dummyData} from "./dummyData";
import {makeRootCategoryNode} from "./type/CategoryNode";

const root = makeRootCategoryNode(dummyData);

console.log("==========깊이 우선 탐색 결과=========");
root.printDepthFirstOrder();
console.log("==========너비 우선 탐색 결과=========");
root.printBreathFirstOrder();

let id="191224000009"; //토끼파
console.log("==========너비 우선 검색 결과(토끼파)=====");
console.log(root.findDepthFirstOrder(id));
console.log("==========너비 우선 검색 결과(토끼파)=====");
console.log(root.findBreathFirstOrder(id));

let foundNode=root.findDepthFirstOrder(id);
console.log("==========깊이 우선 탐색 결과(토끼파)=====");
foundNode.printDepthFirstOrder();
console.log("==========너비 우선 탐색 결과(토끼파)=====");
foundNode.printBreathFirstOrder();
