import { v4 as uuid } from 'uuid';
import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from './User';
import Guest from './Guest';

@ObjectType()
@Entity('events')
class Event {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  description: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Field()
  @Column()
  user_id: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field(() => [Guest])
  @OneToMany(() => Guest, guest => guest.event)
  guest: Guest[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Event;
