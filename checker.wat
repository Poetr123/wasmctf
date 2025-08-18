(module
  (memory (export "memory") 1)
  ;; Data: three bytes \10 \20 \30  (decimal 16,32,48)
  (data (i32.const 0) "\10\20\30")
  (func (export "get_key_len") (result i32)
    i32.const 3
  )
  (func (export "get_key_byte") (param $i i32) (result i32)
    (i32.load8_u (local.get $i))
  )
)
