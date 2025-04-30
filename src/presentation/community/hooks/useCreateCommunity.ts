// src/presentation/community/hook/useCreateCommunity.ts

import { createCommunity } from "@/core/community/actions/create-community.action";
import { CommunityPostRequest } from "@/core/community/interface/community.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCommunity: CommunityPostRequest) => createCommunity(newCommunity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] }); // Actualiza cache
    },
  });
};
