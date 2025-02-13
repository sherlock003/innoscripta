'use client';

import LinkIcon from '@mui/icons-material/Link';
import { Button, Menu, MenuItem } from '@mui/material';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { ArticleSource } from '@/enums/article.enums';
import useAppDispatch from '@/hooks/useAppDispatch';
import { selectSourceState, updateSource } from '@/rtk/article/slice';

const SourceMenu = () => {
  const dispatch = useAppDispatch();
  const source = useSelector(selectSourceState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setSource = (newSource: ArticleSource) => {
    handleClose();
    dispatch(updateSource(newSource));
  };

  return (
    <>
      <Button
        id="source-button"
        variant="contained"
        size="large"
        disableElevation
        aria-controls={open ? 'source-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LinkIcon />}
      >
        {source}
      </Button>
      <Menu
        id="source-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'source-button',
        }}
      >
        {Object.values(ArticleSource).map((source) => (
          <MenuItem key={source} onClick={() => setSource(source)}>
            {source}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(SourceMenu);
