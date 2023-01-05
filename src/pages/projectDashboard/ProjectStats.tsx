import { useQuery } from '@apollo/client';
import { GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { SatoshiAmount } from '../../components/ui';
import { colors } from '../../constants';
import { fonts } from '../../constants/fonts';
import { numberWithCommas } from '../../utils';
import {
  Project,
  UniqueProjectQueryInput,
} from '../../types/generated/graphql';
import { QUERY_PROJECT_DASHBOARD_DATA } from '../../graphql';

const useStyles = createUseStyles({
  statBox: {
    padding: '22px',
    backgroundColor: colors.primary100,
    borderRadius: '4px',
  },
  numberText: {
    fontFamily: fonts.mono,
    fontSize: '28px',
    color: colors.neutral900,
  },
  labelText: {
    fontSize: '16px',
    color: colors.neutral600,
  },
});

type ResponseData = {
  project: Project;
};

type QueryVariables = {
  where: UniqueProjectQueryInput;
};

export const ProjectStats = ({ project }: { project: Project }) => {
  const classes = useStyles();

  const { loading, data } = useQuery<ResponseData, QueryVariables>(
    QUERY_PROJECT_DASHBOARD_DATA,
    {
      variables: { where: { id: project.id } },
    },
  );

  const visitorsCount = data?.project?.statistics?.totalVisitors || 0;

  const getFundersToVisitorsPercentage = (): number => {
    if (visitorsCount === 0) {
      return 100;
    }

    const fundersCount = project.fundersCount || 0;

    return (fundersCount / visitorsCount) * 100;
  };

  return (
    <>
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack w="100%" spacing="40px">
            <VStack alignItems="flex-start">
              <Text fontSize="18px" fontWeight={600} color="brand.neutral600">
                All Time Statistics
              </Text>
              <HStack spacing="22px">
                <VStack className={classes.statBox}>
                  <Text className={classes.numberText}>
                    {loading ? 0 : numberWithCommas(visitorsCount)}
                  </Text>
                  <Text className={classes.labelText}>VISITS</Text>
                </VStack>
                <VStack className={classes.statBox}>
                  <SatoshiAmount
                    fontSize="28px"
                    color="brand.neutral900"
                    fontFamily={fonts.mono}
                  >
                    {loading ? 0 : project.balance}
                  </SatoshiAmount>
                  <Text className={classes.labelText}>FUNDED</Text>
                </VStack>
                <VStack className={classes.statBox}>
                  <Text className={classes.numberText}>
                    {`${
                      loading ? 0 : getFundersToVisitorsPercentage().toFixed(0)
                    } %`}
                  </Text>
                  <Text className={classes.labelText}>FUNDERS/VISITORS</Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem colSpan={5} display="flex" justifyContent="center">
        <VStack
          justifyContent="center"
          alignItems="flex-start"
          maxWidth="370px"
          spacing="10px"
        ></VStack>
      </GridItem>
    </>
  );
};