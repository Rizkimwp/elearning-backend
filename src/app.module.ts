import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MeetingModule } from './meeting/meeting.module';
import { QuizModule } from './quiz/quiz.module';
import { QuizquestionModule } from './quizquestion/quizquestion.module';
import { ModuleModule } from './module/module.module';
import { VideomaterialModule } from './videomaterial/videomaterial.module';
import { DiscussionModule } from './discussion/discussion.module';
import { DiscussionreplyModule } from './discussionreply/discussionreply.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MeetingprogressModule } from './meetingprogress/meetingprogress.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      rootPath: join(__dirname, '..', 'public'), // Path ke folder yang mau dipublikasikan
      serveRoot: '/uploads', // URL prefix → akses via /uploads/namafile.jpg
    }),
    ConfigModule.forRoot(), // Load .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306', 10), // Default to 3306 if undefined
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Jangan aktifkan di production!
    }),
    AuthModule,
    AssignmentModule,
    UsersModule,
    MeetingModule,
    QuizModule,
    QuizquestionModule,
    ModuleModule,
    VideomaterialModule,
    DiscussionModule,
    DiscussionreplyModule,
    MeetingprogressModule,
  ],
})
export class AppModule {}
