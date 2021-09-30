import { firebase, FieldValue } from "../lib/firebase";


export const doesUsernameExists = async (username) => {
  const response = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  return response.docs.length > 0;
};


export const getUserProfiles = async (docId) => {
  const response = await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .collection('profile')
    .get()


  const userProfiles = response.docs.map((item) => {
    return { ...item.data() }
  });

  return userProfiles
};

export const getCurrentProfile = async (docId, proId) => {
  const response = await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .collection('profile')
    .doc(proId)
    .get()

  return response.data();
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}


export const createUserProfile = async (docId, profileName, profileId) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .collection('profile')
    .doc(profileId)
    .set({
      profileName: profileName,
      profileId,
      myList: []

    });

  return;
};

export const addToCurrentProfile = async (docId, profileId, data) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .collection('profile')
    .doc(profileId)
    .update({
      myList: FieldValue.arrayUnion({
        ...data
      })
    });
}

export const removeFromCurrentProfile = async (docId, profileId, data) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .collection('profile')
    .doc(profileId)
    .update({
      myList: FieldValue.arrayRemove({
        ...data
      })
    });
}

export const deleteCurrentProfile = async (docId, profileId) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .collection('profile')
    .doc(profileId)
    .delete()
}
