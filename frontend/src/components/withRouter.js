import { useNavigate, useLocation} from 'react-router-dom'; 

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  const locate = useLocation();
  return (
    <WrappedComponent
      {...props}
      {...{ navigate, locate}}
    />
  );
};

export default withRouter;