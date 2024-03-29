import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Button, Card, CardContent, Typography, Grid } from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../tomb-finance';
import useTombFinance from '../../hooks/useTombFinance';
import Stats from "../Home/Stats"

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const classes = useStyles();
  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);
  const statsOnPool = useStatsForPool(bank);
  console.log("Here", statsOnPool);
  return account && bank ? (
    <>
      {/* <PageHeader
        icon=""
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      /> */}\
     
      <Stats/>
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                <strong style={{color:"wheat"}}>Cemetry</strong>
              </Typography>
                <div className='bio wheat center'>Earn TSHARE by staking LP</div>
      <Box>
        {/* <Grid container justify="center" spacing={3} style={{ marginBottom: '50px' }}> */}
          {/* <Grid item xs={12} md={2} lg={2} className={classes.gridItem}> */}
          <div className="bank">
            <div className="cemetry-small-1">
              <div style={{ textAlign: 'center', boxShadow: 'none !important' }}>
                <Typography className="pad">APR</Typography>
                <Typography>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</Typography>
              </div>
            </div>
          {/* </Grid> */}
          {/* <Grid item xs={12} md={2} lg={2} className={classes.gridItem}> */}
            <div className="cemetry-small-1">
              <div style={{ textAlign: 'center' }}>
                <Typography className="pad">Daily APR</Typography>
                <Typography>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</Typography>
              </div>
            </div>
          {/* </Grid> */}
          {/* <Grid item xs={12} md={2} lg={2} className={classes.gridItem}> */}
            <div className="cemetry-small-1 ">
              <div style={{ textAlign: 'center' }}>
                <Typography className="pad">TVL</Typography>
                <Typography>${statsOnPool?.TVL}</Typography>
              </div>
            </div>
            </div>
          {/* </Grid> */}
        {/* </Grid> */}
      </Box>
      <Box mt={5}>
        {/* <StyledBank> */}
          {/* <StyledCardsWrapper> */}
            {/* <StyledCardWrapper> */}
            <div className="wrapper2">
                            <Harvest bank={bank} />
            {/* </StyledCardWrapper> */}
            {/* <Spacer /> */}
            {/* <StyledCardWrapper> */}
              <Stake bank={bank} />
              {/* </StyledCardWrapper> */}
          {/* </StyledCardsWrapper> */}
          {/* <Spacer size="lg" /> */}
          {/* {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />} */}
          </div>
          <div className="butt">
          <Button onClick={onRedeem} color="primary" variant="contained" className='btn claim'>
            <a href="https://spookyswap.finance/swap?outputCurrency=0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37" className="tomb"> Provide liquidity for TSHARE-FTM pair now on SpookySwap</a> 
            </Button>
          <Spacer size="lg" />
          
            <Button onClick={onRedeem} color="primary" variant="contained" className='btn claim'>
              Claim & Withdraw
            </Button>
            </div>
          {/* <Spacer size="lg" /> */}
        {/* </StyledBank> */}
      </Box>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  const tombFinance = useTombFinance();
  const tombAddr = tombFinance.TOMB.address;
  const tshareAddr = tombFinance.TSHARE.address;

  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('SCT')) {
    pairName = 'SCT-WAVAX pair';
    uniswapUrl = 'https://spookyswap.finance/add/AVAX/' + tombAddr;
  } else {
    pairName = 'PSHARE-WAVAX pair';
    uniswapUrl = 'https://spookyswap.finance/add/AVAX/' + tshareAddr;
  }
  return (
    <Card>
      <CardContent>
        <StyledLink href={uniswapUrl} target="_blank">
          {`👻 Provide liquidity for ${pairName} now on SpookySwap 👻`}
        </StyledLink>
      </CardContent>
    </Card>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
