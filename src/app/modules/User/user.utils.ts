import { UserRole } from './user.constant';
import { User } from './user.model';

// Buyer Id
export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne(
    {
      role: UserRole,
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};
export const generateUserId = async (): Promise<string> => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `U-${incrementedId}`;
  console.log(incrementedId);

  return incrementedId;
};
