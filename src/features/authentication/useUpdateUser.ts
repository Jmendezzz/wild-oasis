import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateCurrentUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({
      fullName,
      password,
      avatar,
    }: {
      fullName?: string;
      password?: string;
      avatar?: File;
    }) => updateCurrentUserApi({ fullName, password, avatar }),
    onSuccess: () => {
      toast.success('Information updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError:()=>{
        toast.error('There was an error uptading your account')
    }
  });

  return {updateCurrentUser,isUpdating}
}
