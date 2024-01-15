import { TableJunction } from "./TableJunction.js";

export class StudentsClassesJunction extends TableJunction {
    constructor(firstUUID: string, secondUUID: string) {
        super(
            "students_classes",
            { name: "students", idRow: "user_id" },
            { name: "classes", idRow: "class_id" },
            firstUUID,
            secondUUID,
        );
    }
}
