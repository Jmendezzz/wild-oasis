import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import SpinnerMini from '../../ui/SpinnerMini';

interface SupabaseUser {
  user: {
    email: string;
    user_metadata: {
      fullName: string;
    };
  };
}

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName } = { fullName: '' },
    } = { user_metadata: { fullName: '' } },
  } = useUser() as unknown as SupabaseUser;

  const [fullName, setFullName] = useState<string>(currentFullName);
  const [avatar, setAvatar] = useState<File | undefined>();
  const { updateCurrentUser, isUpdating } = useUpdateUser();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateCurrentUser({ fullName, avatar });
  }

  return (
    <Form type='submit' onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setAvatar(e.target.files[0]);
            }
          }}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : 'Update account'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
