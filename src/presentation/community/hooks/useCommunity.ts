// src/presentation/community/hook/useCommunity.ts
import { useQuery } from "@tanstack/react-query";
import { CommunityGetRequest } from "@/core/community/interface/community.interface";
import { getCommunities } from "@/core/community/actions/show-community.action";

export const useCommunity = () => {
  const communitiesQuery = useQuery<CommunityGetRequest[]>({
    queryKey: ["communities"],
    queryFn: getCommunities,
  });

  return { communitiesQuery };
};
