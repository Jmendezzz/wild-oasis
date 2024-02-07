import supabase from './supabase';

export async function signup({ fullName, email, password }) {
  await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); //Looks for the sesion in the local storage.

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

interface UpdateUserData {
  password?: string;
  data: {
    fullName?: string;
    avatar?: string;
  };
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File;
}) {
  let updateData: UpdateUserData = {
    data: {},
  };

  if (password) {
    updateData.password = password;
  }
  if (fullName) {
    updateData = {
      ...updateData,
      data: {
        fullName,
      },
    };
  }

  if (avatar) {
    console.log(avatar);

    const currentUser = await getCurrentUser();

    const fileName = `avatar-${currentUser.id}-${Date.now()}`;

    console.log(fileName);

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar);

    if (storageError) {
      throw new Error(storageError.message);
    }

    updateData.data = {
      ...updateData.data,
      avatar: `https://rooguivlderuvcpkzldr.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    };
  }


  const { data: updatedUser, error } = supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }

  return updatedUser;
}
