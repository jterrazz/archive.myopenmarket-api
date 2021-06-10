import { Repository, getConnection } from 'typeorm';

import { Activity, UserActivity } from '~/models/activity.entity';
import { UserSession } from '~/models/user-session';
import { prismaClient } from '@services/database';

const getActivityRepository = (): Repository<Activity> => getConnection().getRepository(Activity);

/**
 * Create
 */

export const createActivity = async (
  userSession: UserSession,
  type: UserActivity,
): Promise<void> => {
  const activityRecord = new Activity();
  activityRecord.user = userSession.user;
  activityRecord.type = type;
  activityRecord.ipAddress = userSession.ipAddress;

  await getActivityRepository().save(activityRecord);
};

export const createUpdateProfileActivity = (userSession: UserSession): Promise<void> =>
  createActivity(userSession, UserActivity.updateProfile);

export const createUpdateShopActivity = (userSession: UserSession): Promise<void> =>
  createActivity(userSession, UserActivity.updateShop);
