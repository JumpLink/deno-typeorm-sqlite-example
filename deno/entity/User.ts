import { Entity, PrimaryGeneratedColumn, Column } from "npm:typeorm@latest"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: String})
    firstName!: string

    @Column({type: String})
    lastName!: string

    @Column({type: String})
    age!: number

}
