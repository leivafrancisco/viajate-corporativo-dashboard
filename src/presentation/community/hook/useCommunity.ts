import { createMyCommunity } from "@/core/community/actions/create-community.action";
import { getCommunities } from "@/core/community/actions/show-community.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCommunity = () => {
  const queryClient = useQueryClient();

  const communitiesQuery = useQuery({
    queryKey: ["community"],
    queryFn: getCommunities,
    staleTime: 1000 * 60 * 10,
  });

  const createCommunity = useMutation({
    mutationFn: createMyCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community"],
      });
    },
    onError: (error: Error) => {
      throw error;
    },
  });

  return {
    communitiesQuery,
    createCommunity,
  };
};
