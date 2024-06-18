import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Loading from "../component/Loading";
import { loadProduct } from "../redux/ProductSlice";
import DataNotFoundPage from "../component/DataNotFoundPage"
import { FaRupeeSign } from "react-icons/fa";
import { SetRating } from "../Review/Reviews_show";

const Product_show = () => {
  const dispatch = useDispatch()
  const userinfo = useSelector((state) => state?.user?.user);
  const { product, productLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.product);
  const navigate = useNavigate();

  function View(data) {
    navigate(`/Product_view/${data._id}`);
  }

  const handleScroll = () => {
    if (!productLoading && next) {
      dispatch(loadProduct({ LowerLimit, UpperLimit, userinfo, searchvalue }));
    }
  };

  return (
    <Container maxWidth="lg">
      {product && product?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell className="text-center">Photo</TableCell>
                <TableCell  className="text-center">Product_id</TableCell>
                <TableCell  className="text-center">Product_name</TableCell>
                <TableCell  className="text-center">Offer</TableCell>
                <TableCell  className="text-center">Price</TableCell>
                <TableCell  className="text-center">Product Type</TableCell>
                <TableCell className="text-center">Total Review</TableCell>
                <TableCell  className="text-center">Avg Rating</TableCell>
                <TableCell  className="text-center">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.map((item) => (
                <TableRow key={item?._id}>
                  <TableCell>
                    <img
                      src={`${item?.newImage?.[0]}`}
                      alt='Error'
                      loading="lazy"
                      style={{ height: '60px', width: '60px', borderRadius: '10px' }}
                    />
                  </TableCell>
                  <TableCell className="text-center">{item?._id}</TableCell>
                  <TableCell className="text-center">{item?.product_name}</TableCell>
                  <TableCell className="text-center">{item?.offer}%</TableCell>
                  <TableCell className="text-center"><FaRupeeSign style={{ marginTop: '-2px', fontSize: '12px' }} />{item?.price}</TableCell>
                  <TableCell className="text-center">{item?.product_type}</TableCell>
                  <TableCell className="text-center">{item?.number_of_people_give_rating}</TableCell>
                  <TableCell className="text-center"><SetRating rating={item?.rating} /> </TableCell>
                  <TableCell className="text-center">
                    <Button variant="contained" size="small" color="info" onClick={() => View(item)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) :
        <DataNotFoundPage />
      }
      {productLoading ? <Loading /> : next &&
        <Button variant="contained" color="secondary" style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', marginLeft: '45%' }} onClick={handleScroll} >
          Load More
        </Button>
      }
    </Container>
  );
};

export default Product_show;
