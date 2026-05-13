import Parse from 'parse';

import type { ISignUp } from 'src/models/interfaces/auth/sign-up.interface';

async function signIn(email: string, password: string) {
  try {
    await Parse.User.logIn(email, password);
  } catch (error) {
    throw error as Parse.Error;
  }
}

async function signUp(user: ISignUp) {
  try {
    const newUser = new Parse.User();
    newUser.set('firstName', user.name);
    newUser.set('lastName', user.lastName);
    newUser.set('username', user.email);
    newUser.set('email', user.email);
    newUser.set('countryCode', user.countryCode);
    newUser.set('phone', user.phone);
    newUser.set('password', user.password);

    await newUser.signUp();

    const acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(Parse.User.current()!, true);
    acl.setWriteAccess(Parse.User.current()!, true);
    newUser.setACL(acl);

    const roleQuery = new Parse.Query(Parse.Role);
    const role = await roleQuery.equalTo('name', 'Admin').first();
    if (!role) throw new Error('Role not found');

    role.getUsers().add(newUser);
    await role.save();

    await newUser.save();

    return newUser;
  } catch (error) {
    throw error as Parse.Error;
  }
}

async function logout() {
  try {
    await Parse.User.logOut();
  } catch (error) {
    throw error as Parse.Error;
  }
}

async function isValidSessionToken() {
  const currentUser = Parse.User.current();

  if (!currentUser) return false;

  try {
    await currentUser.fetch();
    return true;
  } catch {
    await Parse.User.logOut();
    return false;
  }
}

export { signIn, signUp, logout, isValidSessionToken };
