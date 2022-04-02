import React, { useCallback, useMemo, useState } from 'react';
// import Button from '../../../components/Button';
import Modal, { ModalProps } from '../../../components/Modal';
import { Button } from '@material-ui/core';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import { getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import Label from '../../../components/Label';
import { Link } from 'react-router-dom';

interface ExchangeModalProps extends ModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  title: string;
  description: string;
  action: string;
  tokenName: string;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({
  max,
  title,
  description,
  onConfirm,
  onDismiss,
  action,
  tokenName,
}) => {
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => getFullDisplayBalance(max), [max]);

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value), [setVal]);

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <div className="modal-pit">
      <Modal>
        <ModalTitle text={title} />
        <div className="dropdown3">
  <button className="dropbtn3">B_subdomain</button>

  <div className="dropdown3-content">
    <a href="/">Avalanche</a>
    <a href="/">Binance Smart Chain</a>
    <a href="/">Cronos</a>
    <a href="/">Polygon</a>

  </div>
</div>

        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={tokenName}
        />
        <Label text={description} />
        <ModalActions>
          <Button className="btn margintop"  color="primary"  variant="contained" onClick={onDismiss}>Approve SCT</Button>
          {/* <Button className="btn margintop"  color="primary"  variant="contained" onClick={() => onConfirm(val)}>{action}</Button> */}
        </ModalActions>
      </Modal>
    </div>
  );
};

export default ExchangeModal;
