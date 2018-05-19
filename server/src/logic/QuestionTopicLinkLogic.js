/**
 * Created by will on 19/05/18.
 */
import { QuestionTopicLink, Question, Topic, User } from '../db';
import { authLogic } from './AuthLogic';

export const questionTopicLinkLogic = {
  question(questionTopicLink, args, ctx) {
    return Question.findById(questionTopicLink.questionId);
  },
  topic(questionTopicLink, args, ctx) {
    return Topic.findById(questionTopicLink.topicId);
  },
  approval(questionTopicLink, args, ctx) {
    return User.count({
      include: [{model: QuestionTopicLink, as: "TopicLinkApproval", where: {id: questionTopicLink.id}}]
    })
  },
  approvedByCurrentUser(questionTopicLink, args, ctx) {
    return authLogic.getAuthenticatedUser(ctx)
      .then(currentUser => {
        return User.findOne({
          where: { id: currentUser.id },
          include: [{ model: QuestionTopicLink, as: "TopicLinkApproval", where: { id: questionTopicLink.id } }]
        })
          .then(user => {
            return !!user;
          })
      })
      .catch(error => {
        console.log("Error", error);
        return false;
      })
  },
  buildPaginatedQuestionTopicLinks(args, before) {
    return QuestionTopicLink.findAll(args)
      .then(questionTopicLinks => {
        const edges = questionTopicLinks.map(questionTopicLink => {
          return ({
            cursor: Buffer.from(questionTopicLink.id.toString()).toString('base64'), // convert id to cursor
            node: questionTopicLink
          })
        });
        // if no whatifs then no next or prev page
        if (questionTopicLinks.length === 0) {
          return {
            edges,
            pageInfo: {
              hasNextPage() {
                return false;
              },
              hasPreviousPage() {
                return false;
              }
            }
          }
        }

        args.where.id = {
          [before ? '$gt' : '$lt']: questionTopicLinks[questionTopicLinks.length - 1].id,
        };

        return {
          edges,
          pageInfo: {
            hasNextPage () {
              if (questionTopicLinks.length < args.limit) {
                return Promise.resolve(false);
              }
              return QuestionTopicLink.findOne(args)
                .then(questionTopicLink => !!questionTopicLink);
            },
            hasPreviousPage  () {
              return QuestionTopicLink.findOne(args)
                .then(questionTopicLink => !!questionTopicLink);
            }
          }
        }
      })
      .catch(error => {
        console.log(error, "Error");
        return Promise.reject(error)
      })
  },
};