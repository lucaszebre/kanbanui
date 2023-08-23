import z from "zod"
export const schemaRegister = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password1: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
    password2: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' })
        ,
});


export type BoardData = {
    boards: Board[];
}

export type Data = {
    boards: {
        name: string;
        id: string;
        columns: {
            name: string;
            id: string;
            tasks: {
            id: string;
            title: string;
            description: string;
            status: string;
            subtasks: {
                id: string;
                title: string;
                isCompleted: boolean;
            }[];
            }[];
        }[];
        }[];
    };




export type ColumnToRename = {
    id: string;
    name: string;
};

export type RequestBody = {
    boardId: string;
    boardName: string;
    columnsToAdd: ColumnToRename[];
    columnsToRename: ColumnToRename[];
    columnsToRemove: string[];
};



export type ResponseError = {
    message: string;
};


export type ColumnData = {
    _id: string;
    name: string;
};

export type TaskData = {
    id: string;
    title: string;
    description: string;
    status: string;
    columnId: string;
    subtasks: Array<{
        title: string;
        isCompleted: boolean;
    }>;
};




export type Boards = {
    id: string;
    name: string;
};

export type AddBoardType = {
    BoardName: string;
};




export interface Board {
    _id: string;
    name: string;
    userId: string;
    columns: Column[];
    }
    export interface ColumnAdd {
        _id: string;
        name: string;
        boardId: string;
        tasks: Task[];
        add:boolean // Make sure it's 'tasks' instead of 'task'
    }

    export interface Column {
        _id: string;
        name: string;
        boardId: string;
        tasks: Task[];
        add?:boolean // Make sure it's 'tasks' instead of 'task'
    }
    export interface Task {
        _id: string;
        title: string;
        description: string;
        columnId: string;
        subtasks : Subtask[]
    }
    
    export interface Subtask {
        _id: string;
        title: string;
        isCompleted: boolean;
        taskId: string;
    }

    export interface Subtasked{
        title:string;
        isCompleted:boolean
    }



  export   interface ListTaskProps {
        tasks: Task[];
        title: string;
        NbList: number;
        columnId:string
        data: any;
        columnIndex:number
        }


        export const SchemaLogin = z.object({
            email: z.string().min(1,{ message: 'need a email' }),
            password: z.string().min(8, { message: 'at least 8 characters long' })
            .regex(/[A-Za-z]/, { message: ' must contain at least one letter' })
            .regex(/[0-9]/, { message: ' must contain at least one digit' })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: '  at least one special character' }),
          });
          
          export interface FormDataRegister {
            email: string;
            password1: string;
            password2: string;
          }
          
          
          
          export const schemaProfile = z.object({
            firstname: z.string().min(1, { message: 'cant be empty' }),
            lastname: z.string().min(1, { message: 'cant be empty' }),
            email: z.string().email({ message: 'Invalid email format' }),
            });