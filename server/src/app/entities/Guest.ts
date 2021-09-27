import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import User from './User';
import Event from './Event';

@ObjectType()
@Entity('guests')
class Guest {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Field()
  @Column()
  user_id: string;

  @JoinColumn({ name: 'event_id' })
  @ManyToOne(() => Event)
  event: Event;

  @Field()
  @Column()
  event_id: string;

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

export default Guest;
