import * as React from 'react';
import { Button, Grid, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Item, minHeight } from '../style/style';
import { fetchTodos } from '../services/todos/todos';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const { authentication } = useSelector((store) => store);
  const userEmail = authentication?.email;
  const userName = authentication?.userName?.split(' ')[0];
  const token = authentication?.token;
  const [data, setData] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    async function fetchData() {
      const todos = await fetchTodos(userEmail, token);
      setData(todos);
      setLoading(false);
    }
    fetchData();
  }, [userEmail]);
  console.log(data);
  return (
    <>
      {loading ? (
        <>
          <Skeleton width={350} height={50} />
          <Stack direction={'row'} spacing={2}>
            <Skeleton variant="rectangular" width={400} height={118} />
            <Skeleton variant="rectangular" width={400} height={118} />
            <Skeleton variant="rectangular" width={400} height={118} />
          </Stack>
        </>
      ) : (
        <>
          {data ? (
            <Grid container direction="row" alignItems="stretch" rowSpacing={5} columnSpacing={3}>
              {data.length > 0 ? (
                <Grid item xs={12} marginTop={2}>
                  <Typography variant="h4" color="secondary">
                    {userName}&apos;s open todos
                  </Typography>
                </Grid>
              ) : (
                ''
              )}
              {data.length > 0 ? (
                Object.values(data).map((todo, index) => {
                  console.log(todo);
                  return (
                    <>
                      <Grid item lg={4} md={4} sm={12} xs={12} key={todo._id}>
                        <Item index={index}>
                          <div style={minHeight.header}>
                            <Typography variant="h6" color="custom.heading">
                              {todo?.title}
                            </Typography>
                          </div>
                          <div style={minHeight.description}>
                            <Typography variant="body2" color="custom.pageTitle">
                              {todo?.description}
                            </Typography>
                          </div>
                          <div style={minHeight.footer}>
                            <div style={{ width: '50%', display: 'flex', alignItems: 'left' }}>
                              <Button size="small" color="secondary" endIcon={<DeleteIcon />}></Button>
                            </div>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                              <Typography variant="body2">
                                <Button size="small" color="secondary" endIcon={<ArrowForwardIcon />}>
                                  Edit
                                </Button>
                              </Typography>
                            </div>
                          </div>
                        </Item>
                      </Grid>
                    </>
                  );
                })
              ) : (
                <Grid container display={'flex'} justifyContent="center" alignItems="center" marginTop={5}>
                  <Typography variant="h4" color="secondary">
                    You dont have any open todos...!
                  </Typography>
                </Grid>
              )}
              <Grid item lg={4} md={4} sm={12} xs={12} style={{ cursor: 'pointer' }}>
                <Tooltip title="Add New Todo" placement="right">
                  <Item
                    style={{ backgroundColor: '#ebebeb' }}
                    onClick={() => {
                      navigate('/create-todo');
                    }}>
                    <div style={minHeight.header}>
                      <Typography variant="h5"></Typography>
                    </div>
                    <div style={minHeight.description}>
                      <AddIcon />
                    </div>
                    <div style={minHeight.footer}>
                      <Typography variant="h5"></Typography>
                    </div>
                  </Item>
                </Tooltip>
              </Grid>
            </Grid>
          ) : (
            <Grid container display={'flex'} justifyContent="center" alignItems="center">
              <Typography variant="h4" color="primary.main">
                Something went wrong...!
              </Typography>
            </Grid>
          )}
        </>
      )}
    </>
  );
}
