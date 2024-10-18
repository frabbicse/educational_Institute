using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Application.Errors
{
    public class RestException :Exception
    {
         

        public RestException(HttpStatusCode code, object errors= null)
        { 
            _Code = code;
            _Errors = errors;
        }

        public HttpStatusCode _Code { get; }
        public object _Errors { get; }
    }
}
