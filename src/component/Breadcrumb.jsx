import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});


function handleClick(event) {
    event.preventDefault(); // หยุดการทำงานปกติของลิงก์
    const href = event.currentTarget.getAttribute('href'); // ใช้ currentTarget เพื่ออ้างอิงถึงองค์ประกอบที่มีการตั้งค่า onClick
    // console.info('Clicked href:', href); // แสดงค่า href ที่คลิก
    window.location.href = href;
}

export default function Breadcrumb({ breadUrl }) {
    // console.log(breadUrl);
    const cleanPath = breadUrl.replace("/", "");
    const [BreadcrumbIs, setBreadcrumb] = React.useState(breadUrl);
    const cleanPath2 = BreadcrumbIs.replace("/", "");
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                    component="a"
                    href="/Dashboard"
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                    onClick={handleClick} // ใช้ handleClick ใน onClick โดยตรง
                />
                
                {/* ตรวจสอบว่า breadUrl ไม่ใช่ "Dashboard" ก่อนจะแสดงปุ่มนี้ */}
                {breadUrl !== "/Dashboard" && (
                    <StyledBreadcrumb
                        component="a"
                        href='#'
                        label={cleanPath2}
                        onClick={handleClick} // ใช้ handleClick ใน onClick
                    />
                )}
            </Breadcrumbs>
        </div>
    );
}
